# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

## Pull Request Process

Fork the repo and make changes on your fork in a feature branch forked from **develop** branch:
* If it's a bugfix branch, name it XXX-something where XXX is the number of the issue
* If it's a feature branch, create an enhancement issue to announce your intentions, and name it XXX-something where XXX is the number of the issue.

Write clean code. Universally formatted code promotes ease of writing, reading, and maintenance. 

Pull requests descriptions should be as clear as possible and include a reference to all the issues that they address.

Pull requests must not contain commits from other users or branches.

Commit messages must start with a capitalized and short summary (max. 50 chars) written in the imperative, followed by an optional, more detailed explanatory text which is separated from the summary by an empty line.

Code review comments may be added to your pull request. Discuss, then make the suggested modifications and push additional commits to your feature branch. Be sure to post a comment after pushing. The new commits will show up in the pull request automatically, but the reviewers will not be notified unless you comment.

Before the pull request is merged, make sure that you squash your commits into logical units of work using git rebase -i and git push -f. After every commit the test suite should be passing. Include documentation changes in the same commit so that a revert would remove all traces of the feature or fix.

Commits that fix or close an issue should include a reference like Closes #XXX or Fixes #XXX, which will automatically close the issue when merged.

