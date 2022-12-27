const exec = require("child_process").exec;
const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_REGION });
const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

function execute(command) {
  exec(command, function (error, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    if (error) {
      console.error("[ERROR]", error);
    }
  });
}

async function getJobDetail(jobId) {
  const params = {
    TableName: "sf_next_build_tracking",
    Key: {
      build_id: { S: jobId },
    },
  };
  const data = await ddb.getItem(params).promise();
  return AWS.DynamoDB.Converter.unmarshall(data.Item);
}

async function generate() {
  const jobId = process.env.AWS_JOB_ID;
  console.log("Starting generate pages for job", jobId);
  buildDetail = await getJobDetail(jobId);

  // =============== BUILD FULL ================
  if (!buildDetail.entry) {
    console.log("Generate target: full");
    execute(`yarn generate`);
    return;
  }

  // =============== BUILD SPECIFIC TOURS ================
  const entry = JSON.parse(buildDetail.entry);
  const routes = entry.tour_codes.map((code) => ({
    route: `/tour/${code}`,
    payload: {
      isOff: true,
    },
  }));
  execute(`yarn generate -r '${JSON.stringify(routes)}'`);
}

generate();
