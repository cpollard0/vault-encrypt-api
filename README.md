# vault-encrypt-api
Building a serverless ansible-vault encryption engine

Ansible-vault is a great way to encrypt secrets as part of your automation. Using multiple vault password files to seperate production credentials from non-production credentials is also a great security policy. With that, how do you enable folks who work on automation to do that without giving them the keys to the castle in production?

Enter vault-encrypt-api! Built using serverless technology on AWS, vault-encrypt-api creates an API endpoint where you can post secrets and get back a vault encrypted string for commiting to source control.

The system works with a Python Lambda function that does the vault encryption. You pass a secret and a vault password to use. Vault passwords are stored in the parameter store, where they can be encrypted and from which access can be audited.