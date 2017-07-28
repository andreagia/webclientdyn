package org.cirmmp.webclientdyn.elfinder.controller.executors;

import org.cirmmp.webclientdyn.elfinder.controller.executor.AbstractJsonCommandExecutor;
import org.cirmmp.webclientdyn.elfinder.controller.executor.CommandExecutor;
import org.cirmmp.webclientdyn.elfinder.controller.executor.FsItemEx;
import org.cirmmp.webclientdyn.elfinder.service.FsService;
import org.json.JSONObject;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

public class MkdirCommandExecutor extends AbstractJsonCommandExecutor implements
		CommandExecutor
{
	@Override
	public void execute(FsService fsService, HttpServletRequest request,
                        ServletContext servletContext, JSONObject json) throws Exception
	{
		String target = request.getParameter("target");
		String name = request.getParameter("name");

		FsItemEx fsi = super.findItem(fsService, target);
		FsItemEx dir = new FsItemEx(fsi, name);
		dir.createFolder();

		json.put("added", new Object[] { getFsItemInfo(request, dir) });
	}
}
