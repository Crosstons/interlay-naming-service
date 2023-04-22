#![cfg_attr(not(feature = "std"), no_std)]

#[ink::contract]
pub mod naming_service {

    use ink::storage::Mapping;
    use ink::prelude::vec::Vec;

    #[ink(event)]
    pub struct DomainRegistered {
        #[ink(topic)]
        name: Vec<u8>,
        #[ink(topic)]
        owner: AccountId,
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
        account_to_name: Mapping<AccountId, Vec<u8>>,
        suffixes: Vec<Vec<u8>>,
        dao_treasury: AccountId,
    }

    impl NamingService {
        #[ink(constructor)]
        pub fn new(dao_treasury: AccountId) -> Self {
            let mut suffixes = Vec::new();
            suffixes.push(".kbtc".as_bytes().to_vec());
            suffixes.push(".kint".as_bytes().to_vec());
            Self {
                domains: Mapping::default(),
                account_to_name: Mapping::default(),
                suffixes,
                dao_treasury,
            }
        }

        #[ink(message, payable)]
        pub fn register_domain(&mut self, name: Vec<u8>, suffix_idx: u32, days: u64, reverse_name: Option<Vec<u8>>) -> bool {
            if suffix_idx >= self.suffixes.len() as u32 {
                return false;
            }
            let suffix = self.suffixes.get(suffix_idx as usize).unwrap().clone();
            let full_name = [&name[..], &suffix[..]].concat();
            let caller = self.env().caller();
            let value = self.env().transferred_value(); 
            let fee = days as Balance;

            if self.domains.contains(&full_name)
                || full_name.len() > 20
                || value != fee
            {
                return false;
            }

            if let Some(ref reverse_name) = reverse_name {
                if self.account_to_name.contains(&caller) {
                    return false;
                }
            }

            let expiration = self.env().block_timestamp() + days * 86_400_000;

            self.domains.insert(
                full_name.clone(),
                &DomainInfo {
                    owner: caller,
                    expiration,
                },
            );  
            
            if let Some(reverse_name) = reverse_name {
                self.account_to_name.insert(caller, &reverse_name);
            }

            self.env().emit_event(DomainRegistered { name: full_name, owner: caller });            

            if let Err(_) = self.env().transfer(self.dao_treasury, value) {
                return false;
            }

            true            
        }
// Modify the fn below //
        #[ink(message, payable)]
        pub fn renew_domain(&mut self, name: Vec<u8>, days: u64) -> bool {
            let value = self.env().transferred_value();
            let fee = days as Balance;

            if value != fee {
                return false;
            }

            
	if let Some(mut domain_info) = self.domains.take(&name) {
                if domain_info.owner == self.env().caller() {
                    if let Err(_) = self.env().transfer(self.dao_treasury, value) {
                        self.domains.insert(name, &domain_info); // Restore the original value
                        return false;
                    }
                    
                    domain_info.expiration += days * 86_400_000;
                    
                    self.domains.insert(name, &domain_info); // Update the value
                    return true;
                }
            }
            true
        }
//...................................//

        #[ink(message)]
        pub fn get_domain_info(&self, name: Vec<u8>) -> Option<DomainInfo> {
            Some(self.domains.get(name).unwrap())
        }


        #[ink(message)]
        pub fn get_account_reverse_name(&self, account: AccountId) -> Option<Vec<u8>> {
            Some(self.account_to_name.get(account).unwrap())
        }        
    }
}
