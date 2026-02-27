const hoursToMs = (hours) => hours * 3600000;

function center(text, width) {
    text = formatCommas(String(text ?? ''));
    if (text.length >= width) return text.slice(0, width); // or return text unchanged

    const total = width - text.length;
    const left = Math.floor(total / 2);
    const right = total - left;
    return ' '.repeat(left) + text + ' '.repeat(right);
}

function right(text, width) {
    text = formatCommas(String(text ?? ''));
    if (text.length >= width) return text.slice(0, width);
    return ' '.repeat(width - text.length) + text;
}

function cell(text, width, align = 'center') {
    if (align === 'right') return right(text, width);
    return center(text, width);
}

function row(values, widths, aligns = []) {
    return (
        '|' +
        values
            .map((v, i) => cell(v, widths[i], aligns[i] ?? 'center'))
            .join('|') +
        '|'
    );
}

function rule(widths, left='+', mid='+', right='+', fill='-') {
    return left + widths.map(w => fill.repeat(w)).join(mid) + right;
}

function titleLine(text, widths) {
    // Total inner width for title rows that span all columns (no borders)
    const INNER_TOTAL = widths.reduce((a, b) => a + b, 0) + (widths.length - 1); // include the 3 internal '|' positions as spaces
    return '|' + center(text, INNER_TOTAL) + '|';
}

function formatCommas(value) {
    const n = typeof value === 'number' ? value : Number(String(value).replace(/,/g, ''));
    if (!Number.isFinite(n)) return String(value); // leave as-is if not a valid number
    return n.toLocaleString('en-US');
}

module.exports = { hoursToMs, center, cell, row, rule, titleLine }