export default (date: string) => {
	return new Date(date).toLocaleDateString('tr');
};
