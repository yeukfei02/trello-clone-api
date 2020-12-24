import dynamoose from 'dynamoose';
dynamoose.aws.sdk.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: 'ap-southeast-1',
});

const trelloCloneTodoDataSchema = new dynamoose.Schema(
  {
    id: String,
    userId: String,
    title: String,
    description: String,
  },
  {
    saveUnknown: true,
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

const trelloCloneTodoDataModel = dynamoose.model('TrelloCloneTodoData', trelloCloneTodoDataSchema);

export default trelloCloneTodoDataModel;
