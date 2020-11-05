import smtplib
from email.message import EmailMessage
import time.time

gmail_id = 'korupalli87122@gmail.com'
password = ''

def verification_email(user_id):
    msg = EmailMessage()
    msg.set_content('You created an Account with 5star')

    msg['Subject'] = 'Account creation Alert'
    msg['From'] = gmail_id
    msg['To'] = 'rohithkorupalli@gmail.com'

    server = smtplib.SMTP('smtp.gmail.com:587')
    server.ehlo()
    server.starttls()

    server.login(gmail_id, password)
    server.send_message(msg, from_addr=gmail_id, to_addrs='rohithkorupalli@gmail.com' )

    return True
