const core = require('@actions/core');

const ontrackClient = require('@nemerosa/ontrack-github-action-client');

const checkAutoVersioningByRunId = async (clientEnvironment, config, logging) => {
    if (logging) {
        core.info(`Checking auto versioning by run id with ${JSON.stringify(config)}`);
    }
    // GraphQL query
    const query = `
        mutation GitHubCheckAutoVersioningByRunId(
            $owner: String!,
            $repository: String!,
            $runId: Long!,
        ) {
            gitHubCheckAutoVersioningByRunId(input: {
                owner: $owner,
                repository: $repository,
                runId: $runId,
            }) {
                errors {
                    message
                }
            }
        }
    `;
    // Variables
    const variables = {
        owner: config.owner,
        repository: config.repository,
        runId: config.runId,
    };
    // GraphQL call
    const result = await ontrackClient.graphQL(
        clientEnvironment,
        query,
        variables,
        logging
    )
    if (logging) {
        console.log('Result: ', result);
    }
    // OK
    return result;
};

const checkAutoVersioningByBuildName = async (clientEnvironment, config, logging) => {
    if (logging) {
        core.info(`Checking auto versioning by build name with ${JSON.stringify(config)}`);
    }
    // GraphQL query
    const query = `
        mutation GitHubCheckAutoVersioningByBuildName(
            $owner: String!,
            $repository: String!,
            $buildName: String!,
        ) {
            gitHubCheckAutoVersioningByBuildName(input: {
                owner: $owner,
                repository: $repository,
                buildName: $buildName,
            }) {
                errors {
                    message
                }
            }
        }
    `;
    // Variables
    const variables = {
        owner: config.owner,
        repository: config.repository,
        buildName: config.buildName,
    };
    // GraphQL call
    const result = await ontrackClient.graphQL(
        clientEnvironment,
        query,
        variables,
        logging
    )
    if (logging) {
        console.log('Result: ', result);
    }
    // OK
    return result;
};

const checkAutoVersioningByBuildLabel = async (clientEnvironment, config, logging) => {
    if (logging) {
        core.info(`Checking auto versioning by build label with ${JSON.stringify(config)}`);
    }
    // GraphQL query
    const query = `
        mutation GitHubCheckAutoVersioningByBuildLabel(
            $owner: String!,
            $repository: String!,
            $buildLabel: String!,
        ) {
            gitHubCheckAutoVersioningByBuildLabel(input: {
                owner: $owner,
                repository: $repository,
                buildLabel: $buildLabel,
            }) {
                errors {
                    message
                }
            }
        }
    `;
    // Variables
    const variables = {
        owner: config.owner,
        repository: config.repository,
        buildLabel: config.buildLabel,
    };
    // GraphQL call
    const result = await ontrackClient.graphQL(
        clientEnvironment,
        query,
        variables,
        logging
    )
    if (logging) {
        console.log('Result: ', result);
    }
    // OK
    return result;
};

const checkAutoVersioning = async (clientEnvironment, config, logging) => {
    if (config.buildLabel) {
        await checkAutoVersioningByBuildLabel(clientEnvironment, config, logging);
    } else if (config.buildName) {
        await checkAutoVersioningByBuildName(clientEnvironment, config, logging);
    } else {
        await checkAutoVersioningByRunId(clientEnvironment, config, logging);
    }
};

const client = {
    checkAutoVersioning: checkAutoVersioning
}

module.exports = client;