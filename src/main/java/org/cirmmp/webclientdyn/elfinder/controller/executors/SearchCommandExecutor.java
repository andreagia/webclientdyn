package org.cirmmp.webclientdyn.elfinder.controller.executors;

import org.cirmmp.webclientdyn.elfinder.controller.executor.AbstractJsonCommandExecutor;
import org.cirmmp.webclientdyn.elfinder.controller.executor.CommandExecutor;
import org.cirmmp.webclientdyn.elfinder.service.FsService;
import org.cirmmp.webclientdyn.elfinder.util.FsItemFilterUtils;
import org.json.JSONObject;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

public class SearchCommandExecutor extends AbstractJsonCommandExecutor
		implements CommandExecutor
{
	@Override
	public void execute(FsService fsService, HttpServletRequest request,
                        ServletContext servletContext, JSONObject json) throws Exception
	{
		json.put(
				"files",
				files2JsonArray(request, FsItemFilterUtils.filterFiles(
						fsService.find(FsItemFilterUtils
								.createFileNameKeywordFilter(request
										.getParameter("q"))), super
								.getRequestedFilter(request))));
	}
}
