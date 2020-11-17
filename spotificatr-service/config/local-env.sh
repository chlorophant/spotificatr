#!/bin/bash

export NODE_ENV=local # prd is needed for when deploying to the internet for sequelize
export TZ=UTC
export SERVICE_PORT=8443
export SPOTIFY_CLIENT_ID=93b6cab01c8a41bfa618d012429e9f6b
export SPOTIFY_CLIENT_SECRET=8536b7bf0dae4cb2a19c1968346b79da # This should probably not be here, but needed even for local development
export DB_DIALECT=postgres
#export DB_HOST=docker.for.mac.localhost # Needed in order for docker to connect to local postgres.app, if not running through docker just use "localhost"
export DB_HOST=db
export DB_NAME=spotificatr_db_local
export DB_USER=spotificatr_user
export DB_PASS=verysecret123
export DB_PORT=5432
export DB_SSL_CERT=notneededforlocal

# Never use this in production!
export JWT_PRIVATE_KEY=$(cat <<EOF
-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBAIF0TNeQN1HpFXOoseSW3o05Ifk5ryxcA28tLDyQLABwG6ebaKzh
QclUCKn9Fviw+FCsxcNJItMsiV05gNB0HuMCAwEAAQJAC097/0GMc82noClXEZ/U
5gXd4AaYNYn8itQpj0kRbyA7Un17c92NzrCuGrAu5lDP7hgOKM47cNG1GBNM9RXy
cQIhAPGUrT9yoMTTJSkxuNODX+c/3xCdgZg9bXgsuqg0Tl9dAiEAiS5YZADkC7/L
w4K3LrD4cZhcIxd0jThu9CODLm7F0z8CIGMw9bWwfjxyqbZxWP9X2N/dhNyQn26A
AluumfGIkIltAiBPJTkEAWuQx8hU9W6gdqPwTfoimN66t2t0WaTOvkROWwIhAMoe
dpVbE5W8Q+hUaJaySliA39gOa9ToAiryJioz7sbK
-----END RSA PRIVATE KEY-----
EOF
)

# Never use this in production!
export JWT_PUBLIC_KEY=$(cat <<EOF
-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIF0TNeQN1HpFXOoseSW3o05Ifk5ryxc
A28tLDyQLABwG6ebaKzhQclUCKn9Fviw+FCsxcNJItMsiV05gNB0HuMCAwEAAQ==
-----END PUBLIC KEY-----
EOF
)

# Never use this in production!
export SSL_CERT=$(cat <<EOF
-----BEGIN CERTIFICATE-----
MIICpDCCAYwCCQDQ0H3lNz2HFDANBgkqhkiG9w0BAQsFADAUMRIwEAYDVQQDDAls
b2NhbGhvc3QwHhcNMjAwMjA5MjMzMDU3WhcNMzAwMjA2MjMzMDU3WjAUMRIwEAYD
VQQDDAlsb2NhbGhvc3QwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDf
BrlM9NNDq2eAWbCb53tLc3A1uIBbxQdosoxnUK2QDSv7k178zAKIPrHwx+naP4wv
nHH8qof5d8/w6pgNl/FfkGqQQ6pxtOcHupXnVpPXMPIxyHPZCk7ut9zE3vM7io8q
bkB0xC/qM1+G2nhn29Gecj8AqS1vStLhNZY3U75ycyMBzu2m2ObZ/2249pOvIxB5
vttax+VYSLYuNqnbJHYh1HMMazwI3SITmxyOro3JaEAjqqmjXhUW+NgAg3q4bJ/n
Sm52qPrMovc7LtUfVGgF+1ZapY4wNjdgpKn4voz4wMa6nNxTFpoTSRBVmGGSEBDp
RGJF0unMGOiX+hvMkTIFAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAEcAjcIDEvOF
Q+9KYLjZeCOIbgLdN5rm2dvbts/4WRjzpGS2NYgRYt94Hpz2THa9E8OYfGf5/CZv
Hukip5i1qwT49yqYTh8Q+pkopYe1pWEYkosX0EeDPnoNngYQB/ScymkL3PFJK5U9
y9HGfX/t/cSpgEHdbbXt0TWSpDTUvPabpEsvACYln81t+dmhk8KqIM6EFIxFNo+k
DaDrtReqLzC26Hn+gxZU2+KZMMxyYCF7HXpQ6LEzYg/Nw4jagy3I93iNNhAbXxgz
7fQCPDP0/6BNjp8yuuBed4Y8SHP2vACI5g51m90u7KyyBajmE3S8VYzLdxg+GDBc
WbLkFUF1MAo=
-----END CERTIFICATE-----
EOF
)

# Never use this in production!
export SSL_KEY=$(cat <<EOF
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA3wa5TPTTQ6tngFmwm+d7S3NwNbiAW8UHaLKMZ1CtkA0r+5Ne
/MwCiD6x8Mfp2j+ML5xx/KqH+XfP8OqYDZfxX5BqkEOqcbTnB7qV51aT1zDyMchz
2QpO7rfcxN7zO4qPKm5AdMQv6jNfhtp4Z9vRnnI/AKktb0rS4TWWN1O+cnMjAc7t
ptjm2f9tuPaTryMQeb7bWsflWEi2Ljap2yR2IdRzDGs8CN0iE5scjq6NyWhAI6qp
o14VFvjYAIN6uGyf50pudqj6zKL3Oy7VH1RoBftWWqWOMDY3YKSp+L6M+MDGupzc
UxaaE0kQVZhhkhAQ6URiRdLpzBjol/obzJEyBQIDAQABAoIBABe//I2gaLsFDsGR
S4herzeKtIFUA39CTRauJNt/sOvtKyjgObZL910Q6BwO/e065S/Qxia09kPvqVor
cUPJUW/uzhpMymLPc+bTzNDU3GuHD9OTWBrdySgMtlrUryxBBhvrn7uPhNa438xZ
iYbt1rW7zs/ANFFss2Y+MZ/0sAw52a83Ab/XOXlAPydW05A5l7CmgIZOvOajKBx7
kIgjM2uLIjKnkCxZbotIWo6puc83wOBK35Jm1O7A+ptd10Vrzlv4hYU8q1niSu4w
QdrNTYZm4bE0NwzCKzh7RYlEnI/zgMK8s+v0fmi8VeCvTQbUxkkAtOHU9xqWKeUp
5vTQLAECgYEA9mvUiC0aKhxNZ8yTOOc2BXwZsau9sBYO1QNe1QSPnPzSlImA2YsQ
KWcw6Oco3sEIPwegyb7dHnlK5x2M36ssYHeuLXN/+eKHUwH2zkia9NtFupGhb8N3
qolKG8q0MrjKIOI8NcJ31jyDKXAsy+Ic0ke63fyuG1mrUMzo8GiTGQECgYEA57IW
Yrrkby3N4t8ABlacdPRk9r17lTQjZy2RxO3rsILIEZRr4GwPsupybJ6+tMHQ3qn3
59emg035TuN13fL79HecfiHt0JWuJ3PBbxXY8n/CQpwC5igIK69Q8basauHySxYh
0+pwF8H76UecKVywxgfOME1UwGCzfXsJGF0EtQUCgYEAmri3uE0BWaFtpJfZdGgQ
Dj+ObnUT5ATliS/VklCLz5kaqzLu2SisnCJznjjN+5ceE105wpJ5idHEivqN4j46
3dMnZNhZaU+ngiIAkiMaUFWBIZSg1WjYsRYElxCeNh66ow0JmwOgdL6H6DPLnLQ7
PnjVRt6Jfxi9LT2LoK84dQECgYATFlm/wnPFMPnQIdznqMT04Zlbtlpy/TuZaWij
15HeFbgTsq18bIqSi7vndOBzFbB2V3xDzkE6efb658QzB6x4BE6RGYx07Y/OUjvy
QdOAjsPbJu0aNtwNdUDu2MS1fW2vf+BDjAG2A1YUbsDPq4IonkX/Nq+vtYez46np
JuiXXQKBgQDCVl8qJz6EAvSDGkNdiAX1qOrmbKDQCgRY2qHpDN25YlEACtChESfp
JCLiaNhUA9QbPJBwxMJ3yU6TP+ktmzXvwv7PrxefICTRE7n8/8uDC0Tqhzb70/eA
UldJLQzFQFvNQHJHk0o+5STLSHadvLcggiABBmDh661AqHJ4P8wd+A==
-----END RSA PRIVATE KEY-----
EOF
)
