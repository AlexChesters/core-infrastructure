# core-infrastructure
core infrastructure for my personal AWS account

# What's in here?
This project is made up of several CloudFormation stacks:

* [`core-global`](./cdk/stacks/core-global/index.ts)
    * This stack contains global resources (i.e. resources that do not exist
    in a specific AWS region)
* [`core-eu-west-1`](./cdk/stacks/core-eu-west-1/index.ts)
    * This stack contains core infrastructure for `eu-west-1`
* [`core-us-east-1`](./cdk/stacks/core-us-east-1/index.ts)
    * This stack contains core infrastructure for `us-east-1`
