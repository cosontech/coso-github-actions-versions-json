# coso-github-actions-versions-json
This action set a version number in a json file

See also:  
[coso-github-actions-versions-calculate](https://github.com/cosontech/coso-github-actions-versions-calculate)  
[coso-github-actions-versions-release](https://github.com/cosontech/coso-github-actions-versions-release)  
[coso-github-actions-versions-dotnet](https://github.com/cosontech/coso-github-actions-versions-dotnet)  

## Inputs

#### `version-number`
**Required** Version Number

#### `json-path`
**Required** JSON File Path

#### `json-property`
**Required** JSON Property

## Example usage

### JSON Content (file test.json)

```json
{
    "version": "0.0.0"
}
```

```yaml
# required for release action if github token only has read permission
permissions:
  contents: write

steps:  
  # calculate the version number
  - name: Calculate Versions
    id: calculate-version
    uses: cosontech/coso-github-actions-versions-calculate@v1
    with:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      major-number: '1'
      minor-number: '0'

  # update json file with the version number
  - name: Set version
    id: set-version
    uses: cosontech/coso-github-actions-versions-json@v1
    with:
      version-number: ${{ steps.calculate-version.outputs.semVersion }}
      json-path: "${{ github.workspace }}/test.json"
      json-property: 'version'

  # create a release to be able to increment the version number at next run
  - name: Create release
    id: create-release
    uses: cosontech/coso-github-actions-versions-release@v1
    with:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      version-number: ${{ steps.calculate-version.outputs.semVersion }}
      create-version-release: 'true'
      update-major-release: 'true'
```

### JSON Content (file test.json)

```json
{
    "version": {
        "build": "0.0.0"
    }
}
```

```yaml
# required for release action if github token only has read permission
permissions:
  contents: write

steps:  
  # calculate the version number
  - name: Calculate Versions
    id: calculate-version
    uses: cosontech/coso-github-actions-versions-calculate@v1
    with:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      major-number: '1'
      minor-number: '0'

  # update json file with the version number
  - name: Set version
    id: set-version
    uses: cosontech/coso-github-actions-versions-json@v1
    with:
      version-number: ${{ steps.calculate-version.outputs.semVersion }}
      json-path: "${{ github.workspace }}/test.json"
      json-property: 'version.build'

  # create a release to be able to increment the version number at next run
  - name: Create release
    id: create-release
    uses: cosontech/coso-github-actions-versions-release@v1
    with:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      version-number: ${{ steps.calculate-version.outputs.semVersion }}
      create-version-release: 'true'
      update-major-release: 'true'
```

### Full example usage with the versioning actions of COSONTECH

```yaml
# required for release action if github token only has read permission
permissions:
  contents: write

steps:
  # calculate the version number
  - name: Calculate Versions
    id: calculate-version
    uses: cosontech/coso-github-actions-versions-calculate@v1
    with:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      major-number: '1'
      minor-number: '0'

  # update project files with the version number
  - name: Set version
    id: set-dotnet-version
    uses: cosontech/coso-github-actions-versions-dotnet@v1
    with:
      version-semantic: ${{ steps.calculate-version.outputs.semVersion }}
      version-build: ${{ steps.calculate-version.outputs.buildVersion }}
      root-directory: ${{ github.workspace }}

  # update json file with the version number
  - name: Set version
    id: set-version
    uses: cosontech/coso-github-actions-versions-json@v1
    with:
      version-number: ${{ steps.calculate-version.outputs.semVersion }}
      json-path: "${{ github.workspace }}/test.json"
      json-property: 'version'

  # create a release to be able to increment the version number at next run
  - name: Create release
    id: create-release
    uses: cosontech/coso-github-actions-versions-release@v1
    with:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      version-number: ${{ steps.calculate-version.outputs.semVersion }}
      create-version-release: 'true'
      update-major-release: 'true'
```