import * as core from "@actions/core"

const REQUESTED_COMMENTS_PER_PAGE = 20;

export async function deleteOldComments(github, context) {
	const existingComments = await getExistingComments(github, context)
	for (const comment of existingComments) {
		core.debug(`Deleting comment: ${comment.id}`)
		try {
			await github.issues.deleteComment({
				owner: context.repo.owner,
				repo: context.repo.repo,
				comment_id: comment.id,
			})
		} catch (error) {
			console.error(error)
		}
	}
}

async function getExistingComments(github, context) {
	let page = 0
	let results = []
	let response
	do {
		response = await github.issues.listComments({
			issue_number: context.issue.number,
			owner: context.repo.owner,
			repo: context.repo.repo,
			per_page: REQUESTED_COMMENTS_PER_PAGE,
			page: page,
		})
		results = results.concat(response.data)
		page++
	} while (response.data.length === REQUESTED_COMMENTS_PER_PAGE)

	return results.filter(
		comment =>
			!!comment.user &&
			comment.user.login === "github-actions[bot]" &&
			comment.body.includes("Coverage Report"),
	)
}