# Version Organization Script

This script organizes the latest versions of Craft CMS branches (3.x, 4.x, and 5.x) into separate side-by-side folders for easy comparison.

## Overview

The `organize-versions.sh` script uses Git worktrees to create separate working directories for each major version branch. This allows you to:

- Compare code differences between major versions
- Explore features available in different versions
- Access all versions simultaneously without switching branches

## Usage

### Prerequisites

- Git repository with the version branches (3.x, 4.x, 5.x)
- Bash shell environment

### Running the Script

```bash
./organize-versions.sh
```

### What the Script Does

1. **Checks for branch existence**: Verifies that 3.x, 4.x, and 5.x branches exist on the remote
2. **Creates git worktrees**: Sets up separate working directories for each existing branch
3. **Organizes folders**: Creates folders named `3.x/`, `4.x/`, and `5.x/` 
4. **Shows commit information**: Displays the latest commit for each branch
5. **Provides error handling**: Reports clear error messages for any missing branches

### Example Output

```
[INFO] Organizing latest versions of 3.x, 4.x, and 5.x branches...
[SUCCESS] Branch 3.x exists on remote
[INFO] Creating worktree for 3.x in folder: 3.x/
[SUCCESS] Successfully created worktree for 3.x
[INFO] Latest commit in 3.x: 88000ca89e - require webonyx/graphql-php:~14.11.10 and drop the conflict (4 months ago) <brandonkelly>

=== SUMMARY ===
[SUCCESS] Successfully organized the following branches:
  ✓ 3.x/ - Contains latest code from 3.x branch
  ✓ 4.x/ - Contains latest code from 4.x branch  
  ✓ 5.x/ - Contains latest code from 5.x branch

[SUCCESS] You can now compare the different versions side-by-side!
[INFO] Navigate to each folder (3.x 4.x 5.x) to explore the code.
```

## Folder Structure After Running

```
├── 3.x/                    # Craft CMS 3.x branch (PHP >=7.2.5)
│   ├── src/
│   ├── composer.json
│   └── ...
├── 4.x/                    # Craft CMS 4.x branch (PHP ^8.0.2)
│   ├── src/
│   ├── composer.json
│   └── ...
├── 5.x/                    # Craft CMS 5.x branch (PHP ^8.2)
│   ├── src/
│   ├── composer.json
│   └── ...
└── organize-versions.sh    # This script
```

## Key Differences Between Versions

- **3.x**: Requires PHP >=7.2.5, legacy Craft CMS features
- **4.x**: Requires PHP ^8.0.2, modern features with matrix field improvements
- **5.x**: Requires PHP ^8.2, latest features and performance improvements

## Cleanup

To remove the organized folders and worktrees:

```bash
git worktree remove 3.x
git worktree remove 4.x
git worktree remove 5.x
```

Or the script will automatically clean up existing worktrees when run again.

## Error Handling

The script provides clear error messages for:
- Missing branches (e.g., if 6.x or 7.x branches don't exist)
- Git repository issues
- Worktree creation failures

## Technical Details

- Uses `git worktree` for efficient branch organization
- Maintains separate HEAD pointers for each version
- Preserves the main repository working directory
- Automatically fetches required branches if they exist remotely