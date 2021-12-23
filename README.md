# create IAM role
aws iam create-role --role-name BookMuseumLambdaRole --assume-role-policy-document file://trust-policy.json

# attach permission to this role
aws iam attach-role-policy --role-name BookMuseumLambdaRole --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

# deploy zip file and create lambda function
aws lambda create-function --function-name BookMuseum --zip-file fileb://book-museum.zip --handler index.handler --runtime nodejs14.x --role arn:aws:iam::403000007300:role/BookMuseumLambdaRole --region=ap-northeast-1

# invoke lambda function
aws lambda invoke --function-name BookMuseum --cli-binary-format raw-in-base64-out --payload file://BookMuseum-payload.json response.json --region=ap-northeast-1

# delete lambda function
aws lambda delete-function --function-name BookMuseum --region=ap-northeast-1
