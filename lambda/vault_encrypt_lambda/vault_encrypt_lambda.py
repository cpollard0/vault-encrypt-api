""" vault encrypt lambda
    Takes in a secret and a vault password file to use
    Returns a vault encrypted string
 """
from __future__ import print_function
import logging
import json
import boto3
from botocore.exceptions import ClientError
from botocore.vendored import requests
import ansible
from ansible.parsing.vault import VaultLib

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
    """ Makes an ansible vault secret; aka the vault password """
    from ansible.constants import DEFAULT_VAULT_ID_MATCH
    from ansible.parsing.vault import VaultSecret
    return [( DEFAULT_VAULT_ID_MATCH, VaultSecret(secret))]

def get_vault_password(key_name):
    """ gets vault password file and returns it cleaned"""
    # TODO: Add returns if the vault password doesn't exist
    response = SSM_CLIENT.get_parameter(
        Name=key_name,
        WithDecryption=True
    )
    return response['Parameter']['Value']

def lambda_handler(event, context):
    """Main Lambda function."""
    # Get the vault password from SSM
    # TODO: Add validate input function
    eventBody = json.loads(event['body'])
    vault_pass = get_vault_password(eventBody['key_name'])
    # Instantiate the vault with the vault password
    vault = VaultLib(make_secret(vault_pass))
    # Encrypt the secret
    secret=vault.encrypt(eventBody['secret'], None, eventBody.get('vault-id', None))
    # TODO: Actually don't make this crappy
    outcome = {
        "isBase64Encoded": 'false',
        "statusCode": 200,
        "body": secret
    }
    return outcome

def main():
    print("Main")

if __name__== "__main__":
    main()