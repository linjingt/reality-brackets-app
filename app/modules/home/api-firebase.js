import { database } from '../../config/firebase';

export function addComment(comment, callback) {
  const { userId } = comment;
  const newCommentRef = database
    .ref()
    .child('comment')
    .push();
  const newCommentKey = newCommentRef.key;

  comment.id = newCommentKey;

  //write the new comment data simultaneously in the comment list and the user's comments list
  let updates = {};
  updates['/comments/' + newCommentKey] = comment;
  updates['/user-comments/' + userId + '/' + newCommentKey] = comment;

  database
    .ref()
    .update(updates)
    .then(() => callback(true, comment, null))
    .catch(error => callback(false, null, error));
}

export function getComments(callback) {
  const commentsRef = database.ref('comments');

  //start listening for new data
  commentsRef.on('value', function(snapshot) {
    callback(true, snapshot, null);
  });
}

export function updateComment(comment, callback) {
  const { id, userId } = comment;

  let updates = {};
  updates['comments/' + id] = comment;
  updates['/user-comments/' + userId + '/' + id] = comment;

  database
    .ref()
    .update(updates)
    .then(() => callback(true, comment, null))
    .catch(error => callback(false, null, error));
}

export function deleteComment(comment, callback) {
  const { id, userId } = comment;

  let updates = {};
  updates['comments/' + id] = null;
  updates['/user-comments/' + userId + '/' + id] = null;

  database
    .ref()
    .update(updates)
    .then(() => callback(true, comment, null))
    .catch(error => callback(false, null, error));
}

export function toggleLove(data, callback) {
  const { comment, uid } = data;
  const commentRef = database.ref('comments/' + comment.id);

  commentRef.transaction(
    function(comment) {
      if (comment) {
        if (comment.loves && comment.loves[uid]) {
          comment.loveCount--;
          comment.loves[uid] = null;
        } else {
          comment.loveCount++;
          if (!comment.loves) comment.loves = {};
          comment.loves[uid] = true;
        }
      }

      return comment;
    },
    function(error, committed, snapshot) {
      if (error || !committed) callback(false, null, error);
      else callback(true, snapshot.val(), null);
    }
  );
}
