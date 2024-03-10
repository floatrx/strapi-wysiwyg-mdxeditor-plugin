import React from 'react';
import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';
import { useIntl } from 'react-intl';

import Editor from '../Editor';

const Wysiwyg = ({ name, onChange, value, intlLabel, disabled, error, description, required }) => {
  const { formatMessage } = useIntl();
  return (
    <Box>
      <Box>
        <Box>
          <Typography variant="pi" fontWeight="bold">
            {formatMessage(intlLabel)}
          </Typography>
          {required && (
            <Typography variant="pi" fontWeight="bold" textColor="danger600">
              *
            </Typography>
          )}
        </Box>
        <Editor disabled={disabled} name={name} onChange={onChange} value={value} />
        {error && (
          <Typography variant="pi" textColor="danger600">
            {formatMessage({ id: error, defaultMessage: error })}
          </Typography>
        )}
        {description && <Typography variant="pi">{formatMessage(description)}</Typography>}
      </Box>
    </Box>
  );
};

Wysiwyg.defaultProps = {
  description: '',
  disabled: false,
  error: undefined,
  intlLabel: '',
  required: false,
  value: '',
};

export default Wysiwyg;
