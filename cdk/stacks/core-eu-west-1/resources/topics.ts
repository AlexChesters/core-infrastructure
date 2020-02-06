import * as sns from '@aws-cdk/aws-sns'
import * as subs from '@aws-cdk/aws-sns-subscriptions'
import * as cdk from '@aws-cdk/core'

export default (parent: cdk.Construct): sns.Topic[] => {
  const alarmTopic = new sns.Topic(parent, 'AlarmTopic')

  alarmTopic.addSubscription(new subs.EmailSubscription('alex@cheste.rs'))

  return [alarmTopic]
}
