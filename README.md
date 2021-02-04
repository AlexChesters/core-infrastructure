# core-infrastructure
Resources for my personal AWS account that are shared between multiple different
projects

# What's in here?
This project is made up of several CloudFormation stacks.

## [`core-global`](./cdk/stacks/core-global/index.ts)
This stack contains global resources (i.e. resources that do not exist in a
specific AWS region).

* An AWS Budget set to $25, and an email notification to be sent if the
forecasted cost exceeds 125% of that amount
* IAM policies:
    * `CodeBuildBaseManagedPolicy` - A policy containing the necessary permissions
    that allow an AWS CodeBuild project to run
    * `CodePipelineBaseManagedPolicy` - A policy containing the necessary
    permissions that allow an AWS CodePipeline pipeline to run
    * `CodePipelineCloudFormationPolicy` - A policy that is assumed by any
    pipeline in order to perform CloudFormation updates
    * `PackerManagedPolicy` - A policy containing the necessary permissions to
    build an AMI using [Packer](https://www.packer.io/)
* IAM roles:
    * `CodeBuildBaseRole` - A role that has the `CodeBuildBaseManagedPolicy`
    attached
    * `CodePipelineBaseRole` - A role that has the `CodePipelineBaseManagedPolicy`
    attached
    * `CodePipelineCloudFormationRole` - A role that has the
    `CodePipelineCloudFormationPolicy` attached

## [`core-eu-west-1`](./cdk/stacks/core-eu-west-1/index.ts)
This stack contains core infrastructure resources for the `eu-west-1` region

* An S3 bucket where build artifacts from AWS CodeBuild and AWS CodePipeline are
stored
* A VPC with the following set up:
    * An IPv4 CIDR of `10.0.0.0/21`
    * An IPv6 CIDR range decided by AWS
    * 2 public subnets
* An ACM certificate for `*.api.alexchesters.com`
* An SNS topic where CloudWatch alarms can be sent too
* A CodeStar connection to my GitHub account

## [`core-us-east-1`](./cdk/stacks/core-us-east-1/index.ts)
This stack contains core infrastructure resources for the `us-east-1` region

* An S3 bucket where build artifacts from AWS CodeBuild and AWS CodePipeline are
stored
* An ACM certificate for `*.projects.alexchesters.com` and
`*.test.projects.alexchesters.com`

# How is it deployed?
By a GitHub action workflow defined in
[`.github/workflows/ci.yml`](.github/workflows/ci.yml)
