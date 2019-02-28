import * as iam from '@aws-cdk/aws-iam'
import * as s3 from '@aws-cdk/aws-s3'

export default (buildArtifactsBucket: s3.Bucket): iam.PolicyStatement => {
  return new iam
    .PolicyStatement()
    .addActions(
      's3:Get*',
      's3:List*',
      's3:PutObject',
      's3:PutObjectAcl',
      's3:DeleteObject'
    )
    .addResources(
      `${buildArtifactsBucket.bucketArn}/*`,
      buildArtifactsBucket.bucketArn
    )
    .allow()
}
