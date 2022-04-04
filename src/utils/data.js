// Utility Function for Retrieving Sanity User
export const userQuery = (userId) => {
    const query = `*[_type == "user" && _id == '${userId}' ]`;
    return query;
}



