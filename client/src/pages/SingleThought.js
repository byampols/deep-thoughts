import React from 'react';
import {useParams} from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_THOUGHT } from '../utils/queries';
import Auth from '../utils/auth';

import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';

import { Link } from 'react-router-dom';

const SingleThought = props => {
  const { id: thoughtId } = useParams();
  const {loading, data} = useQuery(QUERY_THOUGHT, {
    variables: {id: thoughtId}
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          
          <Link to={`/profile/${thought.username}`} style={{ fontWeight: 700 }}>
            <span style={{ fontWeight: 700 }} className="text-light">
              {thought.username}
            </span>{' '}
            thought on {thought.createdAt}
          </Link>

        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>

      {thought.reactionCount > 0 && <ReactionList reactions={thought.reactions} />}
      {Auth.loggedIn() && <ReactionForm thoughtId={thought._id} />}
    </div>
  );
};

export default SingleThought;
