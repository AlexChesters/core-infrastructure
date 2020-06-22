import * as s3 from '@aws-cdk/aws-s3'
import * as cdk from '@aws-cdk/core'

export default (parent: cdk.Construct): s3.Bucket => {
  return new s3.Bucket(parent, 'BuildArtifactsBucketUSEast1', {
    lifecycleRules: [
      {
        abortIncompleteMultipartUploadAfter: cdk.Duration.days(90),
        id: 'abort-incomplete-multipart-uploads-after-90-days'
      }
    ]
  })
}
