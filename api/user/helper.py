import smtplib
from email.message import EmailMessage
from time import time

gmail_id = 'grp.9267.5@gmail.com'
password = 'Pa@92675'

def verification_email(user_id):
    msg = EmailMessage()
    msg.set_content('You have successfully registered to 5 Star Film Finder. Congratulations!')

    msg['Subject'] = 'Welcome to 5Star Film Finder'
    msg['From'] = gmail_id
    msg['To'] = user_id #'rohithkorupalli@gmail.com'

    server = smtplib.SMTP('smtp.gmail.com:587')
    server.ehlo()
    server.starttls()

    server.login(gmail_id, password)
    server.send_message(msg, from_addr=gmail_id, to_addrs=user_id )

    return True
