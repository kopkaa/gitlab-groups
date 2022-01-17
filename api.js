import fetch from 'node-fetch';
import * as url from './endpoints.js';



export default {

	getGroup: async (id) => {
		const request = await fetch(url.GET_GROUP_URL(id));
		const groups = await request.json();
		return groups;
	},

	getSubgroups: async (id) => {
		const request = await fetch(url.GET_SUBGROUP_URL(id));
		const groups = await request.json();
		return groups;
	},

	getGroupMembers: async (id) => {
		const request = await fetch(url.GET_GROUP_MEMBERS_URL(id));
		const members = await request.json();
		return members;
	},

	getGroupProjects: async (id) => {
		const request = await fetch(url.GET_GROUP_PROJECTS_URL(id));
		const groupProjects = await request.json();
		return groupProjects;
	},

	getProjectMembers: async (id) => {
		const request = await fetch(url.GET_PROJECT_MEMBERS_URL(id));
		const projetMembers = await request.json();
		return projetMembers;
	}
}