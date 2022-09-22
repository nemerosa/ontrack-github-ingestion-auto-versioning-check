// noinspection ExceptionCaughtLocallyJS

const core = require('@actions/core');
const github = require('@actions/github');

const client = require('./client');

const ontrackClient = require('@nemerosa/ontrack-github-action-client');

async function run() {
    try {
        const logging = core.getBooleanInput('logging');

        // Checks that the client is ready, if not just exit without doing anything
        let clientEnvironment = ontrackClient.checkEnvironment(logging);
        if (!clientEnvironment) {
            core.info("Ontrack is not configured. Not doing anything.");
            return;
        } else if (logging) {
            core.info(`Ontrack URL: ${clientEnvironment.url}`)
        }

        // Getting all the arguments
        let owner = core.getInput('owner');
        let repository = core.getInput('repository');
        const buildName = core.getInput('build-name');
        const buildLabel = core.getInput('build-label');

        // Setting the owner
        if (!owner) {
            owner = github.context.repo.owner;
        }

        // Setting the repository
        if (!repository) {
            repository = github.context.repo.repo;
        }

        // Build name & label cannot be specified together
        if (buildName && buildLabel) {
            throw Error('"build-name" and "build-label" cannot be both declared.');
        }

        // Calling Ontrack to check the auto versioning
        await client.checkAutoVersioning(
            clientEnvironment,
            {
                owner,
                repository,
                runId: github.context.runId,
                buildName,
                buildLabel,
            },
            logging
        );

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
