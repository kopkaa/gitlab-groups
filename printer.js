export default function printAccounts(accounts) {
	let format = ''
	format += '--------- GitLab Accounts ----------\n\n'

	accounts.forEach((account) => {
		format += `${account.name} (@${account.username})\n`
		format += `Groups: [${account.groups}]\n`
		format += `Projects: [${account.projects}]\n`
		format += '\n\n'
	})

	format += `Total Users: ${accounts.length}`
	console.log(format);
}