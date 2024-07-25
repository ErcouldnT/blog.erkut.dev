export default (html: string) => {
	// return the text between first h1 tags
	// todo: write better regex
	const regex = /<h1>.+?<\/h1>/;
	const text = html.match(regex);

	if (text) {
		return text[0].replace('<h1>', ' ').replace('</h1>', ' ').trim();
	} else {
		// todo: if there is no h1 tag => put title error
		return null;
	}
};
