import "..\vault_encrypt_lambda.py"


vault_pass = "Isaac"
logging.debug("Vault Password: %s", vault_pass)
vault = VaultLib(make_secret(vault_pass))
secret = "Jake"
print("Secret to encrypt " + secret)
vault_id_secret=vault.encrypt(secret, None, "PROD")
print(vault_id_secret)
non_vault_id_secret=vault.encrypt(secret, VaultLib(make_secret(vault_pass)), None)
print(non_vault_id_secret)
print (vault.decrypt(vault_id_secret))
print (vault.decrypt(non_vault_id_secret))