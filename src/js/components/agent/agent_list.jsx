import React, { Component } from 'react';
import CrudActions from '../../actions/crud_actions';

import AbstractComponent from '../abstract_component';
import List from '../common/list';
import ListItem from '../common/list_item';
import AgentSummary from './agent_summary';
import AgentForm from './agent_form';

import EndPointConstants from '../../constants/end_point_constants';
import ActionSourceConstants from '../../constants/source_types';

export default class AgentList extends AbstractComponent {
	constructor(){
		super();
	}

	render(){
		if(this.state.items){
			return (
				<div>
					<List>
						{this.state.items.map( (item, index) => {
							return (
								<ListItem key={'item-'+index}>
									<AgentSummary initialItemData={item} />
								</ListItem>
							)
						})}
					</List>
					<AgentForm userAction="create" />
				</div>
			)
		} else {
			return null;
		}
	}
}
