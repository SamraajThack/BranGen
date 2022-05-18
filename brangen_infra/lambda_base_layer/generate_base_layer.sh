# Generates base layer for the Lambda functions

#remove the container first (if it exists)
docker rm layer-container

#Build the base layer
docker build -t base-layer .

# Rename it to layer-container
docker run --name layer-container base-layer

#copy the generated zip artifact so our CDK can use it
docker cp layer-container:layer.zip . && echo "Created layer.zip with update base layer."
