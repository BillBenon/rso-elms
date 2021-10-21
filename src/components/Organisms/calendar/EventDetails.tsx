import React from 'react';
import { useParams } from 'react-router';

interface Param {
  eventId: string;
}

export default function EventDetails() {
  const { eventId } = useParams<Param>();

  console.log('event id', eventId);
  return <div></div>;
}
