import dynamoose from 'dynamoose';
dynamoose.aws.sdk.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: 'ap-southeast-1',
});

const trelloCloneUserSchema = new dynamoose.Schema(
  {
    id: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
  },
  {
    saveUnknown: true,
    timestamps: true,
  },
);

const trelloCloneUserModel = dynamoose.model('TrelloCloneUser', trelloCloneUserSchema);

export default trelloCloneUserModel;
