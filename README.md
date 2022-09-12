ontrack-github-ingestion-auto-versioning-check
========================================

GitHub Action used to request a check of the auto versioning.

> See the [auto versioning documentation](https://static.nemerosa.net/ontrack/release/latest/docs/doc/index.html#auto-versioning) for its configuration.

## Example usage

```yaml
- name: 'auto-versioning-check'
  uses: nemerosa/ontrack-github-ingestion-auto-versioning-check@v0.0.1
```

## Inputs

### Project identification

By default, the current repository is used to identify the Ontrack project where the validation must be performed. If need be, another repository can be specified.

#### `owner`

The name of the repository owner where the validation must be performed. If not set, the current repository owner will be used.

#### `repository`

The name of the repository where the validation must be performed. If not set, the current repository will be used.

### Build identification

By default, the current workflow run ID will be used to identify the build to check. It's also possible to use the actual build _name_ or its _label_.

#### `build-name`

Name of the Ontrack build where to create the validation. If not set and if `build-label` is not set either, the current workflow run ID will be used to identify the build.

#### `build-label`

Release property (label) of the Ontrack build where to create the validation. If not set and if `build-name` is not set either, the current workflow run ID will be used to identify the build.

### Misc

#### `logging`

If set to `true`, logs additional information on the console.
