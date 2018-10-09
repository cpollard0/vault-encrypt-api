""" vault encrypt lambda """
from __future__ import print_function
import logging
import json
import boto3
from botocore.exceptions import ClientError
from botocore.vendored import requests
import ansible
from ansible.parsing.vault import VaultLib
from ansible.constants import DEFAULT_VAULT_ID_MATCH
from ansible.parsing.vault import VaultSecret

LOGGER = logging.getLogger()
LOGGER.setLevel(logging.INFO)
DEBUG_MODE = True
if DEBUG_MODE:
    LOGGER.setLevel(logging.DEBUG)

# Set directories or ansible tries to set on it's own, which breaks in lambda
ansible.constants.DEFAULT_LOCAL_TMP = '/tmp/ansible'
ansible.constants.DEFAULT_REMOTE_TMP = '/tmp/ansible'
ansible.local_tmp = '/tmp/ansible'

SSM_CLIENT = boto3.client('ssm')

def make_secret(secret):
    """ makes a secret"""
    return [(DEFAULT_VAULT_ID_MATCH, VaultSecret(secret))]

def get_vault_password(key_name):
    """ gets vault password file and reutrns it cleaned"""
    response = SSM_CLIENT.get_parameter(
        Name=key_name,
        WithDecryption=True
    )
    return response['Parameter']['Value']

def lambda_handler(event, context):
    """Main Lambda function."""
    vault_pass = get_vault_password(event['key_name'])
    logging.debug("Vault Password: %s", vault_pass)
    vault = VaultLib(make_secret(vault_pass))
    secret = vault.encrypt(event["secret"])
    return secret

def main():
    """Main stub"""
    print("Main")

if __name__ == "__main__":
    main()
