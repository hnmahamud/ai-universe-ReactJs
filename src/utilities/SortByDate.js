const sortByDate = (data) => {
  const sorted = data.sort((a, b) => {
    return new Date(b.published_in) - new Date(a.published_in);
  });
  return sorted;
};

export default sortByDate;
