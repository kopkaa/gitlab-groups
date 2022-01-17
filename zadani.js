import api from './api.js'
import  access_level from './access_level.js'
import printer from './printer.js'


let topLevelGroupId = process.argv.slice(2)[0]
topLevelGroupId = parseInt(topLevelGroupId)


if(!topLevelGroupId) {
	console.log('Top level group id argument is required !')
	process.kill(process.pid, 'SIGTERM')
}

let accounts = []
let groups = []
let projects = []

// 10975505
const topLevelGroup = await api.getGroup(topLevelGroupId)
const subGroups = await api.getSubgroups(topLevelGroupId);


groups.push(topLevelGroup)
groups.push(...subGroups)

groups = groups.map(async (group) => {
  const { id, full_path } = group
  const groupMembers = await api.getGroupMembers(id)

	const groupProjects = await api.getGroupProjects(id)
	projects.push(groupProjects);

  return { group_id: id, full_path, groupMembers };
});

groups = await Promise.all(groups)

accounts = groups
  .flatMap(group => group.groupMembers)
  .map(({ id, username, name, access_level }) => ({ id, username, name,  access_level, groups: [], projects: [] }))



// Map groups to accounts
groups.forEach((group) => {
		group.groupMembers.forEach((member) => {
				const groupAccount = accounts.find(element => element.id == member.id)
				if(!groupAccount) return;

				const { full_path } = group
				const groupFormat = `${full_path} (${access_level[groupAccount.access_level]})`
				groupAccount.groups.push(groupFormat)
  	})
})


projects = projects
  .flatMap(project => project)
  .map(({ id, path_with_namespace }) => ({ id, path_with_namespace }))


projects = projects.map( async (project) => {
	const { id, path_with_namespace } = project;
	const projectMembers = await api.getProjectMembers(id)

	return { project_id: id, path_with_namespace, projectMembers}
})

projects = await Promise.all(projects)

// Map projects to accounts
projects.forEach((project) => {
	project.projectMembers.forEach((member) => {
			 const projectAccount = accounts.find(element => element.id == member.id)
			 if(!projectAccount) return;

			 const { path_with_namespace }= project
			 const projectFormat = `${path_with_namespace} (${access_level[projectAccount.access_level]})`
			 projectAccount.projects.push(projectFormat);
	 })
})

printer(accounts);
