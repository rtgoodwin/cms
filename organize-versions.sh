#!/bin/bash

# Script to organize latest versions of 3.x, 4.x, and 5.x branches into separate folders
# Uses git worktrees for side-by-side comparison

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "This script must be run from within a git repository."
    exit 1
fi

print_status "Organizing latest versions of 3.x, 4.x, and 5.x branches..."

# Array of branches to organize
branches=("3.x" "4.x" "5.x")
missing_branches=()
successful_setups=()

# Clean up any existing worktrees first
print_status "Cleaning up any existing worktrees..."
for branch in "${branches[@]}"; do
    if [ -d "$branch" ]; then
        print_status "Removing existing worktree directory: $branch"
        git worktree remove "$branch" 2>/dev/null || true
        rm -rf "$branch" 2>/dev/null || true
    fi
done

# Check each branch and set up worktrees
for branch in "${branches[@]}"; do
    print_status "Checking branch: $branch"
    
    # Check if the remote branch exists
    if git ls-remote --exit-code --heads origin "$branch" >/dev/null 2>&1; then
        print_success "Branch $branch exists on remote"
        
        # Create worktree for this branch
        print_status "Creating worktree for $branch in folder: $branch/"
        
        # Use local branch if it exists, otherwise use origin reference
        if git rev-parse --verify "$branch" >/dev/null 2>&1; then
            branch_ref="$branch"
        else
            branch_ref="origin/$branch"
        fi
        
        if git worktree add "$branch" "$branch_ref"; then
            successful_setups+=("$branch")
            print_success "Successfully created worktree for $branch"
            
            # Show the commit info for this branch
            cd "$branch"
            COMMIT_INFO=$(git log -1 --pretty=format:"%h - %s (%cr) <%an>")
            print_status "Latest commit in $branch: $COMMIT_INFO"
            cd ..
        else
            print_error "Failed to create worktree for $branch"
            missing_branches+=("$branch")
        fi
    else
        print_error "Branch $branch does not exist on remote origin"
        missing_branches+=("$branch")
    fi
    
    echo # Add a blank line for readability
done

# Print summary
echo
print_status "=== SUMMARY ==="

if [ ${#successful_setups[@]} -gt 0 ]; then
    print_success "Successfully organized the following branches:"
    for branch in "${successful_setups[@]}"; do
        echo "  ✓ $branch/ - Contains latest code from $branch branch"
    done
fi

if [ ${#missing_branches[@]} -gt 0 ]; then
    print_warning "The following branches could not be set up:"
    for branch in "${missing_branches[@]}"; do
        echo "  ✗ $branch - Branch does not exist or could not be accessed"
    done
fi

echo
if [ ${#successful_setups[@]} -gt 0 ]; then
    print_success "You can now compare the different versions side-by-side!"
    print_status "Navigate to each folder (${successful_setups[*]}) to explore the code."
    print_status "To remove the worktrees later, run: git worktree remove <folder-name>"
else
    print_error "No branches were successfully organized."
    exit 1
fi