import React from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  List, ListItem, ListItemText, Button, Typography
} from '@mui/material';

const formatLabel = (label) =>
  label.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

const ViewPopup = ({ user, closePopup }) => {
  return (
    <Dialog open={true} onClose={closePopup} maxWidth="sm" fullWidth
      PaperProps={{ sx: { p: 2, borderRadius: 2, backgroundColor: '#f9f9f9' } }}
    >
      <DialogTitle>User Details</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          This is a read-only view of the user's information.
        </Typography>
        <List>
          {Object.entries(user).map(([key, value]) => (
            <ListItem key={key} divider sx={{ py: 1.5 }}>
              <ListItemText
                primaryTypographyProps={{ fontWeight: 500, color: 'text.secondary' }}
                secondaryTypographyProps={{ fontSize: '15px' }}
                primary={formatLabel(key)}
                secondary={value || '—'}
              />
            </ListItem>
          ))}
        </List>
        <Button
          onClick={closePopup}
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPopup;
