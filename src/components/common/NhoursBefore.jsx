'use client';

import React from 'react'
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

function NhoursBefore({createdAt}) {
    const NhoursBefore = formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: ko });

  return (
    <div>{NhoursBefore}</div>
  )
}

export default NhoursBefore