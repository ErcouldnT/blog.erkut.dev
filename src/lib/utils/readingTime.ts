import { readingTime } from 'reading-time-estimator';

export default (content: string) => {
	return readingTime(content, 200, 'tr').text;
};
