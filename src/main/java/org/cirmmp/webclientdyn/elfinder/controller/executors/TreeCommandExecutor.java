package org.cirmmp.webclientdyn.elfinder.controller.executors;

import org.cirmmp.webclientdyn.elfinder.controller.executor.AbstractJsonCommandExecutor;
import org.cirmmp.webclientdyn.elfinder.controller.executor.CommandExecutor;
import org.cirmmp.webclientdyn.elfinder.controller.executor.FsItemEx;
import org.cirmmp.webclientdyn.elfinder.service.FsService;
import org.json.JSONObject;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

public class TreeCommandExecutor extends AbstractJsonCommandExecutor implements
		CommandExecutor
{
	@Override
	public void execute(FsService fsService, HttpServletRequest request,
                        ServletContext servletContext, JSONObject json) throws Exception
	{
		String target = request.getParameter("target");

		Map<String, FsItemEx> files = new HashMap<String, FsItemEx>();
		FsItemEx fsi = super.findItem(fsService, target);
		super.addSubfolders(files, fsi);

		json.put("tree", files2JsonArray(request, files.values()));
	}
}
