import * as s3 from '@aws-cdk/aws-s3'
import * as cdk from '@aws-cdk/cdk'

export default (parent: cdk.Construct): s3.Bucket => {
  return new s3.Bucket(parent, 'BuildArtifactsBucketUSEast1', {
    lifecycleRules: [
      {
        abortIncompleteMultipartUploadAfterDays: 1,
        id: 'abort-incomplete-multipart-uploads-after-1-day'
      },
      {
        expirationInDays: 1,
        id: 'expire-all-objects-after-1-day'
      }
    ]
  })
}
