import { tabulate } from "./tabulate"
import { th, tr, td, table, tbody, a, b, span, fragment } from "./html"
import { LcovFile } from "lcov-parse"
import { IOptions } from "./IOptions"

test("tabulate should generate a correct table", function() {
	const data: LcovFile[] = [
		{
			file: "/files/project/index.js",
			title: "index.js",
			functions: {
				found: 0,
				hit: 0,
				details: [],
			},
			lines: {
				found: 0,
				hit: 0,
				details: []
			},
			branches: {
				found: 0,
				hit: 0,
				details: [],
			}
		},
		{
			file: "/files/project/src/foo.js",
			title: "foo.js",
			lines: {
				found: 23,
				hit: 21,
				details: [
					{
						line: 20,
						hit: 3,
					},
					{
						line: 21,
						hit: 3,
					},
					{
						line: 22,
						hit: 3,
					},
				],
			},
			functions: {
				hit: 2,
				found: 3,
				details: [
					{
						name: "foo",
						line: 19,
						hit: 1,
					},
					{
						name: "bar",
						line: 33,
						hit: 1,
					},
					{
						name: "baz",
						line: 54,
						hit: 1,
					},
				],
			},
			branches: {
				hit: 3,
				found: 3,
				details: [
					{
						line: 21,
						block: 0,
						branch: 0,
						taken: 1,
					},
					{
						line: 21,
						block: 0,
						branch: 1,
						taken: 2,
					},
					{
						line: 37,
						block: 1,
						branch: 0,
						taken: 0,
					},
				],
			},
		},
		{
			file: "/files/project/src/bar/baz.js",
			title: "baz.js",
			lines: {
				found: 10,
				hit: 5,
				details: [
					{
						line: 20,
						hit: 0,
					},
					{
						line: 21,
						hit: 0,
					},
					{
						line: 27,
						hit: 0,
					},
				],
			},
			functions: {
				hit: 2,
				found: 3,
				details: [
					{
						name: "foo",
						line: 19,
						hit: 1,
					},
					{
						name: "bar",
						line: 33,
						hit: 1,
					},
					{
						name: "baz",
						line: 54,
						hit: 1,
					},
				],
			},
			branches: {
				hit: 0,
				found: 0,
				details: [],
			}
		},
	]

	const options = {
		repository: "example/foo",
		commit: "2e15bee6fe0df5003389aa5ec894ec0fea2d874a",
		prefix: "/files/project/",
		workingDir: 'frontend'
	}

	const html = table(
		tbody(
			tr(
				th("File"),
				th("Stmts"),
				th("Branches"),
				th("Funcs"),
				th("Lines"),
				th("Uncovered Lines"),
			),
			tr(
				td(
					a(
						{
							href: `https://github.com/${options.repository}/blob/${options.commit}/frontend/index.js`,
						},
						"index.js",
					),
				),
				td("100%"),
				td("100%"),
				td("100%"),
				td("100%"),
				td(),
			),
			tr(td({ colspan: 6 }, b("src"))),
			tr(
				td(
					"&nbsp; &nbsp;",
					a(
						{
							href: `https://github.com/${options.repository}/blob/${options.commit}/frontend/src/foo.js`,
						},
						"foo.js",
					),
				),
				td(b("89.66%")),
				td("100%"),
				td(b("66.67%")),
				td(b("91.30%")),
				td(
					a(
						{
							href: `https://github.com/${options.repository}/blob/${options.commit}/frontend/src/foo.js#L37`,
						},
						37,
					),
				),
			),
			tr(td({ colspan: 6 }, b("src/bar"))),
			tr(
				td(
					"&nbsp; &nbsp;",
					a(
						{
							href: `https://github.com/${options.repository}/blob/${options.commit}/frontend/src/bar/baz.js`,
						},
						"baz.js",
					),
				),
				td(b("53.85%")),
				td("100%"),
				td(b("66.67%")),
				td(b("50%")),
				td(
					a(
						{
							href: `https://github.com/${options.repository}/blob/${options.commit}/frontend/src/bar/baz.js#L20-L21`,
						},
						"20&ndash;21",
					),
					", ",
					a(
						{
							href: `https://github.com/${options.repository}/blob/${options.commit}/frontend/src/bar/baz.js#L27`,
						},
						"27",
					),
				),
			),
		),
	)
	expect(tabulate(data, options as IOptions)).toBe(html)
})

test("filtered tabulate should generate a correct table with only changed files", function() {
	const data: LcovFile[] = [
		{
			file: "/files/project/index.js",
			title: "index.js",
			functions: {
				found: 0,
				hit: 0,
				details: [],
			},
			branches: {
				found: 0,
				hit: 0,
				details: [],
			},
			lines: {
				found: 0,
				hit: 0,
				details: [],
			}
		},
		{
			file: "/files/project/src/foo.js",
			title: "foo.js",
			lines: {
				found: 23,
				hit: 21,
				details: [
					{
						line: 20,
						hit: 3,
					},
					{
						line: 21,
						hit: 3,
					},
					{
						line: 22,
						hit: 3,
					},
				],
			},
			functions: {
				hit: 2,
				found: 3,
				details: [
					{
						name: "foo",
						line: 19,
						hit: 1,
					},
					{
						name: "bar",
						line: 33,
						hit: 1,
					},
					{
						name: "baz",
						line: 54,
						hit: 1,
					},
				],
			},
			branches: {
				hit: 3,
				found: 3,
				details: [
					{
						line: 21,
						block: 0,
						branch: 0,
						taken: 1,
					},
					{
						line: 21,
						block: 0,
						branch: 1,
						taken: 2,
					},
					{
						line: 37,
						block: 1,
						branch: 0,
						taken: 0,
					},
				],
			},
		},
		{
			file: "/files/project/src/bar/baz.js",
			title: "baz.js",
			lines: {
				found: 10,
				hit: 5,
				details: [
					{
						line: 20,
						hit: 0,
					},
					{
						line: 21,
						hit: 0,
					},
					{
						line: 27,
						hit: 0,
					},
				],
			},
			functions: {
				hit: 2,
				found: 3,
				details: [
					{
						name: "foo",
						line: 19,
						hit: 1,
					},
					{
						name: "bar",
						line: 33,
						hit: 1,
					},
					{
						name: "baz",
						line: 54,
						hit: 1,
					},
				],
			},
			branches: {
				hit: 0,
				found: 0,
				details: [],
			}
		},
	]

	const options = {
		repository: "example/foo",
		commit: "2e15bee6fe0df5003389aa5ec894ec0fea2d874a",
		prefix: "/files/project/",
		shouldFilterChangedFiles: true,
		changedFiles: ["src/foo.js"],
	}

	const html = table(
		tbody(
			tr(
				th("File"),
				th("Stmts"),
				th("Branches"),
				th("Funcs"),
				th("Lines"),
				th("Uncovered Lines"),
			),
			tr(td({ colspan: 6 }, b("src"))),
			tr(
				td(
					"&nbsp; &nbsp;",
					a(
						{
							href: `https://github.com/${options.repository}/blob/${options.commit}/src/foo.js`,
						},
						"foo.js",
					),
				),
				td(b("89.66%")),
				td("100%"),
				td(b("66.67%")),
				td(b("91.30%")),
				td(
					a(
						{
							href: `https://github.com/${options.repository}/blob/${options.commit}/src/foo.js#L37`,
						},
						37,
					),
				),
			),
		),
	)
	expect(tabulate(data, options as IOptions)).toBe(html)
})

test("filtered tabulate should generate an empty result when no matching changed files and dontPostIfNoChangedFilesInReport set", function() {
	const data: LcovFile[] = [
		{
			file: "/files/project/index.js",
			title: "index.js",
			functions: {
				found: 0,
				hit: 0,
				details: [],
			},
			branches: {
				found: 0,
				hit: 0,
				details: [],
			},
			lines: {
				found: 0,
				hit: 0,
				details: [],
			}
		},
		{
			file: "/files/project/src/foo.js",
			title: "foo.js",
			lines: {
				found: 23,
				hit: 21,
				details: [
					{
						line: 20,
						hit: 3,
					},
					{
						line: 21,
						hit: 3,
					},
					{
						line: 22,
						hit: 3,
					},
				],
			},
			functions: {
				hit: 2,
				found: 3,
				details: [
					{
						name: "foo",
						line: 19,
						hit: 1,
					},
					{
						name: "bar",
						line: 33,
						hit: 1,
					},
					{
						name: "baz",
						line: 54,
						hit: 1,
					},
				],
			},
			branches: {
				hit: 3,
				found: 3,
				details: [
					{
						line: 21,
						block: 0,
						branch: 0,
						taken: 1,
					},
					{
						line: 21,
						block: 0,
						branch: 1,
						taken: 2,
					},
					{
						line: 37,
						block: 1,
						branch: 0,
						taken: 0,
					},
				],
			},
		},
		{
			file: "/files/project/src/bar/baz.js",
			title: "baz.js",
			lines: {
				found: 10,
				hit: 5,
				details: [
					{
						line: 20,
						hit: 0,
					},
					{
						line: 21,
						hit: 0,
					},
					{
						line: 27,
						hit: 0,
					},
				],
			},
			functions: {
				hit: 2,
				found: 3,
				details: [
					{
						name: "foo",
						line: 19,
						hit: 1,
					},
					{
						name: "bar",
						line: 33,
						hit: 1,
					},
					{
						name: "baz",
						line: 54,
						hit: 1,
					},
				],
			},
			branches: {
				hit: 0,
				found: 0,
				details: [],
			},
		},
	]

	const options = {
		repository: "example/foo",
		commit: "2e15bee6fe0df5003389aa5ec894ec0fea2d874a",
		prefix: "/files/project/",
		shouldFilterChangedFiles: true,
		changedFiles: ["src/not-in-this-report.js"],
	}

	expect(tabulate(data, options as IOptions)).toBe("")
})

test("filtered tabulate should fix backwards slashes in filenames", function() {
	const data: LcovFile[] = [
		{
			file: "\\files\\project\\index.js",
			title: "index.js",
			functions: {
				found: 0,
				hit: 0,
				details: [],
			},
			branches: {
				found: 0,
				hit: 0,
				details: [],
			},
			lines: {
				found: 0,
				hit: 0,
				details: [],
			}
		},
		{
			file: "\\files\\project\\src\\foo.js",
			title: "foo.js",
			lines: {
				found: 23,
				hit: 21,
				details: [
					{
						line: 20,
						hit: 3,
					},
					{
						line: 21,
						hit: 3,
					},
					{
						line: 22,
						hit: 3,
					},
				],
			},
			functions: {
				hit: 2,
				found: 3,
				details: [
					{
						name: "foo",
						line: 19,
						hit: 1,
					},
					{
						name: "bar",
						line: 33,
						hit: 1,
					},
					{
						name: "baz",
						line: 54,
						hit: 1,
					},
				],
			},
			branches: {
				hit: 3,
				found: 3,
				details: [
					{
						line: 21,
						block: 0,
						branch: 0,
						taken: 1,
					},
					{
						line: 21,
						block: 0,
						branch: 1,
						taken: 2,
					},
					{
						line: 37,
						block: 1,
						branch: 0,
						taken: 0,
					},
				],
			},
		},
		{
			file: "\\files\\project\\src\\bar\\baz.js",
			title: "baz.js",
			lines: {
				found: 10,
				hit: 5,
				details: [
					{
						line: 20,
						hit: 0,
					},
					{
						line: 21,
						hit: 0,
					},
					{
						line: 27,
						hit: 0,
					},
				],
			},
			functions: {
				hit: 2,
				found: 3,
				details: [
					{
						name: "foo",
						line: 19,
						hit: 1,
					},
					{
						name: "bar",
						line: 33,
						hit: 1,
					},
					{
						name: "baz",
						line: 54,
						hit: 1,
					},
				],
			},
			branches: {
				hit: 0,
				found: 0,
				details: [],
			}
		},
	]

	const options = {
		repository: "example/foo",
		commit: "2e15bee6fe0df5003389aa5ec894ec0fea2d874a",
		prefix: "/files/project/",
		shouldFilterChangedFiles: true,
		changedFiles: ["src/foo.js"],
	}
	
	const html = table(
		tbody(
			tr(
				th("File"),
				th("Stmts"),
				th("Branches"),
				th("Funcs"),
				th("Lines"),
				th("Uncovered Lines"),
			),
			tr(td({ colspan: 6 }, b("src"))),
			tr(
				td(
					"&nbsp; &nbsp;",
					a(
						{
							href: `https://github.com/${options.repository}/blob/${options.commit}/src/foo.js`,
						},
						"foo.js",
					),
				),
				td(b("89.66%")),
				td("100%"),
				td(b("66.67%")),
				td(b("91.30%")),
				td(
					a(
						{
							href: `https://github.com/${options.repository}/blob/${options.commit}/src/foo.js#L37`,
						},
						37,
					),
				),
			),
		),
	)
	expect(tabulate(data, options as IOptions)).toBe(html)
})

test("maxUncoveredLines should limit number of uncovered lines displayed", function() {
	const data: LcovFile[] = [
		{
			file: "/files/project/src/bar/baz.js",
			title: "baz.js",
			lines: {
				found: 10,
				hit: 5,
				details: [
					{
						line: 20,
						hit: 0,
					},
					{
						line: 21,
						hit: 0,
					},
					{
						line: 27,
						hit: 0,
					},
					{
						line: 29,
						hit: 0,
					},
					{
						line: 41,
						hit: 0,
					},
				],
			},
			functions: {
				hit: 2,
				found: 3,
				details: [
					{
						name: "foo",
						line: 19,
						hit: 1,
					},
					{
						name: "bar",
						line: 33,
						hit: 1,
					},
					{
						name: "baz",
						line: 54,
						hit: 1,
					},
				],
			},
			branches: {
				hit: 0,
				found: 0,
				details: [],
			}
		},
	]

	const options = {
		repository: "example/foo",
		commit: "2e15bee6fe0df5003389aa5ec894ec0fea2d874a",
		prefix: "/files/project/",
		maxUncoveredLines: 2,
	}

	const html = table(
		tbody(
			tr(
				th("File"),
				th("Stmts"),
				th("Branches"),
				th("Funcs"),
				th("Lines"),
				th("Uncovered Lines"),
			),
			tr(td({ colspan: 6 }, b("src/bar"))),
			tr(
				td(
					"&nbsp; &nbsp;",
					a(
						{
							href: `https://github.com/${options.repository}/blob/${options.commit}/src/bar/baz.js`,
						},
						"baz.js",
					),
				),
				td(b("53.85%")),
				td("100%"),
				td(b("66.67%")),
				td(b("50%")),
				td(
					a(
						{
							href: `https://github.com/${options.repository}/blob/${options.commit}/src/bar/baz.js#L20-L21`,
						},
						"20&ndash;21",
					),
					", ",
					a(
						{
							href: `https://github.com/${options.repository}/blob/${options.commit}/src/bar/baz.js#L27`,
						},
						"27",
					),
					" and 2 more...",
				),
			),
		),
	)
	expect(tabulate(data, options as IOptions)).toBe(html)
})