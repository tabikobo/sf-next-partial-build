const execSync = require("child_process").execSync;
const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_REGION });
const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

function execute(command) {
  execSync(command, { stdio: "inherit" });
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
  if (!buildDetail.entry || buildDetail.entry.is_build_full) {
    console.log("Generate target: full");
    execute(`rm -r ${process.env.PUBLISH_DIR}`);
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

function postGenerate() {
  console.log("Starting postGenerate");
  execute(`mkdir -p ${process.env.PUBLISH_DIR}`);
  execute(`cp -ru dist/* ${process.env.PUBLISH_DIR}`);
  execute(`ls -l ${process.env.PUBLISH_DIR}/tour`);
}

function main() {
  generate().then(postGenerate);
}

main();
