export const formatFriendlyDate = (dateString: string): string => {
	const date = new Date(dateString);

	const options: Intl.DateTimeFormatOptions = {
		weekday: 'short',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	};

	return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const timeSince = (dateString: string): string => {
	const date = new Date(dateString);
	const now = new Date();
	const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	const intervals: { [key: string]: number } = {
		year: 31536000,
		month: 2592000,
		week: 604800,
		day: 86400,
		hour: 3600,
		minute: 60
	};

	if (seconds < intervals.minute) {
		return 'just now';
	} else if (seconds < intervals.hour) {
		const minutes = Math.floor(seconds / intervals.minute);
		return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
	} else if (seconds < intervals.day) {
		const hours = Math.floor(seconds / intervals.hour);
		return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
	} else if (seconds < intervals.week) {
		const days = Math.floor(seconds / intervals.day);
		return `${days} day${days !== 1 ? 's' : ''} ago`;
	} else if (seconds < intervals.month) {
		const weeks = Math.floor(seconds / intervals.week);
		return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
	} else if (seconds < intervals.year) {
		const months = Math.floor(seconds / intervals.month);
		return `${months} month${months !== 1 ? 's' : ''} ago`;
	} else {
		const years = Math.floor(seconds / intervals.year);
		return `${years} year${years !== 1 ? 's' : ''} ago`;
	}
};
