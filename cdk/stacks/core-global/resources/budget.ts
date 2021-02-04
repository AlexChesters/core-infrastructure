import * as budgets from '@aws-cdk/aws-budgets'
import * as cdk from '@aws-cdk/core'

export default (parent: cdk.Construct) => {
  new budgets.CfnBudget(parent, 'MonthlyBudget', {
    budget: {
      budgetLimit: {
        amount: 50,
        unit: 'USD'
      },
      budgetType: 'COST',
      timeUnit: 'MONTHLY'
    },
    notificationsWithSubscribers: [
      {
        notification: {
          comparisonOperator: 'GREATER_THAN',
          notificationType: 'FORECASTED',
          threshold: 125,
          thresholdType: 'PERCENTAGE'
        },
        subscribers: [
          {
            address: 'alex@cheste.rs',
            subscriptionType: 'EMAIL'
          }
        ]
      }
    ]
  })
}
