# Craft CMS Version Comparison (3.x to 5.x)

This branch contains side-by-side folders for comparing different major versions of Craft CMS.

## Structure

- **3.x/** - Latest code from the 3.x branch (commit: 88000ca89e)
  - Contains 2,097 files
  - Last update: Requires webonyx/graphql-php:~14.11.10 and drop the conflict
  
- **4.x/** - Latest code from the 4.x branch (commit: b32a0dcf94, tag: 4.16.9.1)
  - Contains 2,109 files
  - Last update: Finish 4.16.9.1
  
- **5.x/** - Latest code from the 5.x branch (commit: 6e4282b78e)
  - Contains 6,189 files
  - Last update: Support widget similar issues on GitHub heading marks

## Usage

Each folder contains the complete source code for that version, allowing for:
- Direct file-by-file comparison between versions
- Understanding architectural changes across major versions
- Migration planning and compatibility analysis
- Feature comparison and evolution tracking

## Important Notes

- These folders are snapshots taken from the latest commits on each respective branch
- Each folder is a complete, standalone copy of that version's source code
- No git history is preserved within the folders (use the original branches for history)
- Files may have line ending differences due to git normalization

## Git Commit References

- 3.x: `88000ca89e682c4359122d4ad62be80bdc2f18c9`
- 4.x: `b32a0dcf9410f9a81fb2d8fa7382e8d60da2f069` 
- 5.x: `6e4282b78e78fc069005f091c06bc16cc3a53432`