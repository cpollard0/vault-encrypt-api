""" vault encrypt lambda
    Takes in a secret and a vault password file to use
    Returns a vault encrypted string
 """
from __future__ import print_function
import logging
import json
import base64
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
SECRETS_MANAGER_CLIENT = boto3.client('secretsmanager')

def make_secret(secret):
    """ Makes an ansible vault secret"""
    from ansible.constants import DEFAULT_VAULT_ID_MATCH
    from ansible.parsing.vault import VaultSecret
    return [(DEFAULT_VAULT_ID_MATCH, VaultSecret(secret))]

def get_vault_password(application_name, env):
    """ gets vault password file and returns it cleaned"""
    # TODO: Add returns if the vault password doesn't exist
    current_secret_value = SECRETS_MANAGER_CLIENT.get_secret_value(
        SecretId=application_name
    )
    json_current_secret = json.loads(current_secret_value['SecretString'])
    return json_current_secret[env]

def lambda_handler(event, context):
    """Main Lambda function."""
    # Get the vault password from SSM
    outcome = {}
    # TODO: Add validate input function
    try:
        event_body = json.loads(event['body'])
        application = event_body['application']
        env = event_body['env']
        vault_pass = get_vault_password(application, env).encode('utf-8')
        print(vault_pass)
        # vault_pass="abcdfefgha"
        # Instantiate the vault with the vault password
        vault = VaultLib(make_secret(vault_pass))
        # Encrypt the secret
        secret = vault.encrypt(event_body['secret'], None, event_body.get('vault-id', None))
        # TODO: Actually don't make this crappy
        print(secret)
        responseBody = {"secret": base64.b64encode(secret)}
        outcome = {
            "isBase64Encoded": 'true',
            "statusCode": 200,
            "body": json.dumps(responseBody),
            "headers": {
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials": "true"
            }
        }
        print(outcome)
    except Exception as e:
        print(e)
        outcome['statusCode'] = 502
    return outcome

def main():
    print("Main")
    #print(get_vault_password("chris_new_app4","preprd"))
    event = {
        'body': json.dumps({"application":"chris_new_app4", "env":"preprd", "secret":"isaac and jake are my joys!"})
    }
    print(event)
    print(event['body'])
    print()
    print(lambda_handler(event, ""))

if __name__ == "__main__":
    main()