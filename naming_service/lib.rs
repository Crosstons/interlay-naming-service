#![cfg_attr(not(feature = "std"), no_std)]

#[ink::contract]
pub mod naming_service {

    use ink::storage::Mapping;
    use ink::prelude::vec::Vec;

    const MAX_DAYS: u64 = 365 * 5;

    #[ink(event)]
    pub struct DomainRegistered {
        #[ink(topic)]
        name: Vec<u8>,
        #[ink(topic)]
        owner: AccountId,
    }

    #[ink(event)]
    pub struct DomainDeregistered {
        #[ink(topic)]
        name: Vec<u8>,
    }

    #[ink(event)]
    pub struct DomainTransferred {
        #[ink(topic)]
        name: Vec<u8>,
        #[ink(topic)]
        from: AccountId,
        #[ink(topic)]
        to: AccountId,
    }

    #[derive(scale::Decode, scale::Encode)]
    #[cfg_attr(
        feature = "std",
        derive(
            Debug,
            PartialEq,
            Eq,
            scale_info::TypeInfo,
            ink::storage::traits::StorageLayout
        )
    )]
    pub struct DomainInfo {
        owner: AccountId,
        expiration: Timestamp,
    }

    #[ink(storage)]
    pub struct NamingService {
        domains: Mapping<Vec<u8>, DomainInfo>,
        suffixes: Vec<Vec<u8>>,
    }

    impl NamingService {
        #[ink(constructor)]
        pub fn new() -> Self {
            let mut suffixes = Vec::new();
            suffixes.push(".kbtc".as_bytes().to_vec());
            suffixes.push(".kint".as_bytes().to_vec());
            Self {
                domains: Mapping::default(),
                suffixes,
            }
        }

        #[ink(message, payable)]
        pub fn register_domain(&mut self, name: Vec<u8>, suffix_idx: u32, days: u64) -> bool {
            if suffix_idx >= self.suffixes.len() as u32 {
                return false;
            }
            if days > MAX_DAYS || days <= 1 {
                return false;
            }

            if !Self::is_valid_domain_name(&name) || name.len() <= 2 {
                return false;
            }

            let suffix = self.suffixes.get(suffix_idx as usize).unwrap().clone();
            let full_name = [&name[..], &suffix[..]].concat();
            let caller = self.env().caller();
            

            if self.domains.contains(&full_name)
            {
                return false;
            }

            let expiration = self.env().block_timestamp() + (days * 86_400_000);

            self.domains.insert(
                full_name.clone(),
                &DomainInfo {
                    owner: caller,
                    expiration,
                },
            );  

            self.env().emit_event(DomainRegistered { name: full_name, owner: caller });            

            true            
        }

        #[ink(message, payable)]
        pub fn renew_domain(&mut self, name: Vec<u8>, days: u64) -> bool {

            if days > MAX_DAYS || days <= 1 {
                return false;
            }

	    if let Some(mut domain_info) = self.domains.take(&name) {
                if domain_info.owner == self.env().caller() {                  
                    domain_info.expiration += (days * 86_400_000);                   
                    self.domains.insert(name, &domain_info); // Update the value   
                    return true;
                }
                
                return false;
                
            } 
            else {
            
            	return false;
            }
        }

        #[ink(message)]
        pub fn transfer_domain(&mut self, name: Vec<u8>, new_owner: AccountId) -> bool {
            if let Some(mut domain_info) = self.domains.take(&name) {
                let caller = self.env().caller();
                if domain_info.owner == caller {
                    domain_info.owner = new_owner;
                    self.domains.insert(name.clone(), &domain_info);
                    self.env().emit_event(DomainTransferred {
                        name: name.clone(),
                        from: caller,
                        to: new_owner,
                    });
                    return true;
                }
            }
            false
        }

        #[ink(message)]
        pub fn deregister_domain(&mut self, name: Vec<u8>) -> bool {
            if let Some(domain_info) = self.domains.take(&name) {
                let current_time = self.env().block_timestamp();
                if domain_info.expiration <= current_time {
                    self.domains.remove(&name);
                    self.env().emit_event(DomainDeregistered { name: name.clone() });
                    return true;
                }
            }
            false
        }        
        
        #[ink(message)]
        pub fn get_domain_info(&self, name: Vec<u8>) -> Option<DomainInfo> {
            self.domains.get(name)
        }
        
        pub fn is_valid_domain_name(name: &[u8]) -> bool {
            let max_length: usize = 25;
            let allowed_chars: &[u8] = b"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-";
        
            // Check if the domain name exceeds the maximum allowed length
            if name.len() > max_length {
                return false;
            }
        
            for &byte in name {
                // Check for whitespace characters
                if byte.is_ascii_whitespace() {
                    return false;
                }
        
                // Check for special characters
                if !allowed_chars.contains(&byte) {
                    return false;
                }
            }
        
            true
        }        
    }
    
    #[cfg(test)]
    mod tests {
        use super::*;
    
        fn new_naming_service() -> NamingService {
            let dao_treasury = ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();
            NamingService::new(dao_treasury.bob)
        }
    
        #[ink::test]
        fn default_works() {
            let contract = new_naming_service();
            assert_eq!(contract.get_domain_info(b"non-existent-domain".to_vec()), None);
        }
    
        #[ink::test]
        fn register_domain_works() {
            let mut contract = new_naming_service();
    	    let accounts = ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();
            let name: Vec<u8> = b"vanis".to_vec();
            let days: u64 = 365;
            let suffix_idx: u32 = 0;
    
            assert_eq!(contract.register_domain(name.clone(), suffix_idx, days), true);
            let domain_info = contract.get_domain_info(b"vanis.kbtc".to_vec()).unwrap();
            assert_eq!(domain_info.owner, accounts.alice);
            assert!(domain_info.expiration > 0);
        }
    
        #[ink::test]
        fn renew_domain_works() {
            let mut contract = new_naming_service();
    
            let name: Vec<u8> = b"vanis".to_vec();
            let days: u64 = 365;
            let suffix_idx: u32 = 0;
    
            assert_eq!(contract.register_domain(name.clone(), suffix_idx, days), true);
            let old_domain_info = contract.get_domain_info(b"vanis.kbtc".to_vec()).unwrap();
    
            let renew_days: u64 = 30;
            assert_eq!(contract.renew_domain(b"vanis.kbtc".to_vec(), renew_days), true);
    
            let new_domain_info = contract.get_domain_info(b"vanis.kbtc".to_vec()).unwrap();
            assert_eq!(new_domain_info.owner, old_domain_info.owner);
            assert_eq!(new_domain_info.expiration, old_domain_info.expiration + renew_days * 86_400_000);
        }
    }
    
}
