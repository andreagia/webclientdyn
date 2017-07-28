package org.cirmmp.webclientdyn.elfinder.controller.executors;

import org.cirmmp.webclientdyn.elfinder.controller.executor.AbstractJsonCommandExecutor;
import org.cirmmp.webclientdyn.elfinder.controller.executor.CommandExecutor;
import org.cirmmp.webclientdyn.elfinder.controller.executor.FsItemEx;
import org.cirmmp.webclientdyn.elfinder.service.FsItemFilter;
import org.cirmmp.webclientdyn.elfinder.service.FsService;
import org.json.JSONObject;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

public class MkfileCommandExecutor extends AbstractJsonCommandExecutor
		implements CommandExecutor
{
	@Override
	public void execute(FsService fsService, HttpServletRequest request,
                        ServletContext servletContext, JSONObject json) throws Exception
	{
		String target = request.getParameter("target");
		String name = request.getParameter("name");

		FsItemEx fsi = super.findItem(fsService, target);
		FsItemEx dir = new FsItemEx(fsi, name);
		dir.createFile();

		// if the new file is allowed to be display?
		FsItemFilter filter = getRequestedFilter(request);
		json.put(
				"added",
				filter.accepts(dir) ? new Object[] { getFsItemInfo(request, dir) }
						: new Object[0]);
	}
}
